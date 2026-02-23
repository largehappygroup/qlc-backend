const assert = require('assert');
const fs = require('fs');
const path = require('path');

const User = require('../models/User');
const mongoose = require('mongoose');

describe('process-assignments script', function () {
  const base = path.join(__dirname, '..', 'assignment-submissions');
  const processingDir = path.join(base, 'assignment-processing', 'PA12-A');
  const fallbackProcessingDir = path.join(base, 'assignment-processing');
  const destAssignmentDir = path.join(base, 'PA12-A');

  let origFind;
  let origConnect;
  let origDisconnect;

  before(async () => {
    // ensure MONGO_URI present so script does not exit; connect is stubbed below
    process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dummy';
    // prepare dirs
    await fs.promises.mkdir(processingDir, { recursive: true });

    // create two student folders and a csv
    const aliceDir = path.join(processingDir, 'alice@example.com-1');
    const bobDir = path.join(processingDir, 'bob@other.edu-1');
    await fs.promises.mkdir(aliceDir, { recursive: true });
    await fs.promises.mkdir(bobDir, { recursive: true });
    // add a dummy file in each
    await fs.promises.writeFile(path.join(aliceDir, 'A.java'), 'class A {}');
    await fs.promises.writeFile(path.join(bobDir, 'B.java'), 'class B {}');

    // add csv in processing dir
    await fs.promises.writeFile(path.join(processingDir, 'scores.csv'), 'username,correctness total,correctness total possible\nalice@example.com,8,10\nbob@other.edu,5,10');

    // stub DB find to return only alice as study participant
    origFind = User.find;
    User.find = () => ({ lean: async () => [{ email: 'alice@example.com' }] });

    // stub mongoose connect/disconnect
    origConnect = mongoose.connect;
    origDisconnect = mongoose.disconnect;
    mongoose.connect = async () => {};
    mongoose.disconnect = async () => {};
  });

  after(async () => {
    // restore stubs
    User.find = origFind;
    mongoose.connect = origConnect;
    mongoose.disconnect = origDisconnect;

    // cleanup created directories
    const rimraf = async (p) => {
      if (!fs.existsSync(p)) return;
      const entries = await fs.promises.readdir(p, { withFileTypes: true });
      for (const e of entries) {
        const ep = path.join(p, e.name);
        if (e.isDirectory()) await rimraf(ep);
        else await fs.promises.unlink(ep);
      }
      await fs.promises.rmdir(p);
    };

    await rimraf(processingDir).catch(() => {});
    await rimraf(path.join(base, 'PA12-A')).catch(() => {});
    // also remove fallback processing dir if empty
    try { await fs.promises.rmdir(fallbackProcessingDir); } catch (e) {}
  });

  it('moves participant folders to include and others to not-include, and moves CSV to assignment root', async function () {
    this.timeout(5000);
    const proc = require('../assignment-submissions/process-assignments');
    await proc.main('PA12-A');

    const includeDir = path.join(destAssignmentDir, 'include-submissions');
    const notIncludeDir = path.join(destAssignmentDir, 'not-include-submissions');

    // alice should be in include
    const aliceExists = fs.existsSync(path.join(includeDir, 'alice@example.com-1'));
    assert.strictEqual(aliceExists, true, 'alice folder should be moved to include-submissions');

    // bob should be in not-include
    const bobExists = fs.existsSync(path.join(notIncludeDir, 'bob@other.edu-1'));
    assert.strictEqual(bobExists, true, 'bob folder should be moved to not-include-submissions');

    // csv moved
    const csvExists = fs.existsSync(path.join(destAssignmentDir, 'scores.csv'));
    assert.strictEqual(csvExists, true, 'CSV should be moved to assignment root');
  });
});
