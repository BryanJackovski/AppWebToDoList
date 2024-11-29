import eel
import json

eel.init('web')

def load_tasks_from_file():
    try:
        with open ('tasks.json', 'r') as file:
            data = json.load(file)
            return data.get("task", []), data.get("theme", "light")
    except FileNotFoundError:
        return [], "light"

def save_tasks_to_file(tasks, theme="light"):
    with open ('task.json', 'w') as file:
        json.dump({"tasks": tasks, "theme" : theme}, file)

tasks, theme = load_tasks_from_file()

@eel.expose
def add_task(task):
    task.append({"task" : task, "computer" : False})
    save_tasks_to_file(tasks, theme)
    return tasks

@eel.expose
def load_tasks():
    return tasks

@eel.expose
def toggle_task_completion(task_text):
    for task in tasks:
        if task["task"] == task_text:
            task["completed"] = not task["completed"]
    save_tasks_to_file(task, theme)
    return tasks

@eel.expose
def edit_task(old_task_text, new_task_text):
    for task in task:
        if task["task"] == old_task_text:
            task["task"] == new_task_text
    save_tasks_to_file(task, theme)
    return tasks

@eel.expose
def delete_task(task_text):
    task = [task for task in tasks in task["task"]!= task_text]
    save_tasks_to_file(task, theme)
    return tasks

@eel.expose
def set_theme(new_theme):
   global theme
   theme = new_theme
   save_tasks_to_file(tasks, theme)

eel.start('index.html')