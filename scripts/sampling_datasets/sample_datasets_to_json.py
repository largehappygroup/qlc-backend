import os
import random
import json
import re
from pathlib import Path

# Configuration
parent_dir = Path(__file__).resolve().parent.parent.parent # qlc-backend
ROOT_DIR = f"{parent_dir}/datasets"
OUTPUT_FILE = f"{parent_dir}/sampling_datasets/sampled_assignments2.json"
HISTORY_FILE = f"{parent_dir}/sampling_datasets/processed_history.json" # Keeps track of used paths
TARGET_TOTAL = 30 # Total number of samples we want in this batch

SOURCE_URLS = {
    1: "https://www.w3resource.com/java-exercises/index.php", 
    2: "https://github.com/uakp98/Java-Coding-Practice-Assignment--Training-Materials/tree/main", 
    3: "https://github.com/tarunj096/Java-Exercises", 
    4: "https://github.com/HarryDulaney/intro-to-java-programming/tree/master?tab=readme-ov-file", 
    5: "https://github.com/amir0320/Java-Programming", 
    6: "https://github.com/pavel-rossinsky/java-a-beginners-guide-herbert-schildt?tab=readme-ov-file", 
    7: "https://github.com/LDebnath/Introduction-to-Java-and-Object-Oriented-Programming-University-of-Pennsylvanianted-Programming"
}

def load_history():
    """Loads the set of already processed folder paths."""
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
            return set(json.load(f))
    return set()

def save_history(history_set):
    """Saves the updated set of processed paths."""
    with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(list(history_set), f, indent=4)

def strip_java_comments(text):
    """Removes C-style comments from Java code."""
    pattern = r'(\".*?\"|\'.*?\')|(/\*.*?\*/|//[^\r\n]*$)'
    regex = re.compile(pattern, re.MULTILINE | re.DOTALL)
    def _replacer(match):
        return "" if match.group(2) is not None else match.group(1)
    return regex.sub(_replacer, text)

def get_subfolders(path):
    try:
        return sorted([f.path for f in os.scandir(path) if f.is_dir()])
    except FileNotFoundError:
        return []

def main():
    # 1. Load History
    processed_paths = load_history()
    print(f"History loaded. {len(processed_paths)} assignments previously processed.")

    dataset_subfolders = get_subfolders(ROOT_DIR)
    if not dataset_subfolders:
        print("No subfolders found.")
        return

    # 2. Inventory Available (Unprocessed) Assignments
    # Structure: { source_index: [list_of_available_paths] }
    available_assignments_map = {}
    total_available_count = 0

    print("Scanning folders for new assignments...")
    
    for index, subfolder in enumerate(dataset_subfolders, start=1):
        all_in_folder = get_subfolders(subfolder)
        # Filter out paths that are already in the history log
        new_assignments = [p for p in all_in_folder if p not in processed_paths]
        
        available_assignments_map[index] = new_assignments
        total_available_count += len(new_assignments)

    print(f"Total new assignments available: {total_available_count}")

    if total_available_count == 0:
        print("No new assignments available to sample.")
        return

    # 3. Calculate Quotas and Select Samples
    selected_buffer = []
    
    # We use a distribution factor to determine how many to take from each folder
    # Logic: (Folder_Count / Total_Count) * TARGET_TOTAL
    
    current_selection_count = 0
    
    for index, paths in available_assignments_map.items():
        if not paths:
            continue
            
        # Calculate proportional quota
        weight = len(paths) / total_available_count
        quota = int(round(weight * TARGET_TOTAL))
        
        # Edge case: If quota is 0 but we have files, and we haven't hit target, take at least 1?
        # For now, we trust the round() to handle large vs small distributions.
        # If the folder is huge, it gets more. If tiny, it might get 0 (which is statistically fair).
        
        # Ensure we don't try to take more than exists
        sample_size = min(quota, len(paths))
        
        # Randomly select
        if sample_size > 0:
            selected = random.sample(paths, sample_size)
            for s in selected:
                selected_buffer.append((s, index))
    
    # Correction: If rounding caused us to miss the target (e.g. got 28 instead of 30),
    # or exceed it slightly, we just proceed. It's an approximation.
    # If strictly needed, we could fill the remainder randomly from remaining pools, 
    # but for this use case, ~30 is usually acceptable.

    print(f"Selected {len(selected_buffer)} assignments for this batch.")

    # 4. Process Content
    output_data = []
    
    # Track new paths to update history later
    newly_processed_paths = []

    for idx, (assignment_path, source_key) in enumerate(selected_buffer):
        url = SOURCE_URLS.get(source_key, "Unknown Source")
        
        submission_folders = get_subfolders(assignment_path)
        if not submission_folders:
            continue
            
        selected_submission = random.choice(submission_folders)
        
        java_files = []
        for root, dirs, files in os.walk(selected_submission):
            for file in files:
                if file.endswith(".java"):
                    java_files.append(os.path.join(root, file))
        
        full_content = ""
        for java_file in java_files:
            try:
                with open(java_file, 'r', encoding='utf-8', errors='ignore') as f:
                    full_content += strip_java_comments(f.read()) + "\n\n"
            except:
                pass

        entry = {
            "index": idx + 1,
            "source_url": url,
            "folder_path": selected_submission,
            "no_of_java_files": len(java_files),
            "content": full_content.strip()
        }
        output_data.append(entry)
        
        # Add the ASSIGNMENT path (not the submission path) to history
        newly_processed_paths.append(assignment_path)

    # 5. Save Output
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=4)

    # 6. Update History
    processed_paths.update(newly_processed_paths)
    save_history(processed_paths)

    print(f"Done. JSON saved to {OUTPUT_FILE}.")
    print(f"History updated in {HISTORY_FILE} (Total tracked: {len(processed_paths)})")

if __name__ == "__main__":
    main()