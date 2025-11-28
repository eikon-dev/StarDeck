import React, {useState} from "react"; //добавил React чтоб IDE не жаловалась
import type {TaskCycle, Priority} from "../types/task.ts";
import useTasksStore from "../store/useTasksStore.ts";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";

//определись со скобками ""/''

export default function TaskForm() {

    const addTask = useTasksStore(s => s.addTask);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('med');
    const [kind, setKind] = useState<TaskCycle>('daily');

    function submit(event: React.FormEvent) {
        event.preventDefault();

        const t = title.trim();
        const d = description.trim();

        if (!t) return;

        const newTaskInput = {
            title: t,
            description: d,
            priority: priority,
            cycle: kind,
        }

        addTask(newTaskInput);

        setTitle('');
        setDescription('');
        setPriority('med');
        setKind('daily');
    }

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function handlePriorityChange() {
        setPriority(event.target.value as Priority);
    }

    function handleSelectKindChange() {
        setKind(event.target.value as TaskCycle);
    }

    function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }
    //вынести стили, стили нужно централизовывать для удобства и масштабируемости
    return (
        <div>
            <form onSubmit={submit} className="flex gap-3 items-center ">
                <Input
                    className="w-64 font-label"
                    placeholder='Новая задача'
                    value={title}
                    onChange={handleTitleChange}
                    aria-label='Название задачи'
                />
                <Input
                    className="w-64 font-label"
                    placeholder='Описание (необязательно)'
                    value={description}
                    onChange={handleDescriptionChange}
                    aria-label='Описание задачи'
                />
                <Select value={priority}
                        onValueChange={handlePriorityChange}>
                    <SelectTrigger className='font-label'>
                        <SelectValue placeholder='Приоритет'/>
                    </SelectTrigger>
                    <SelectContent className='font-label'>
                        <SelectGroup>
                            <SelectItem value='low'>Низкий</SelectItem>
                            <SelectItem value='med'>Средний</SelectItem>
                            <SelectItem value='high'>Высокий</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select value={kind}
                        onValueChange={handleSelectKindChange}>
                    <SelectTrigger className='font-label'>
                        <SelectValue placeholder='Тип задачи'/>
                    </SelectTrigger>
                    <SelectContent className='font-label'>
                        <SelectGroup>
                            <SelectItem value='daily'>Ежедневная</SelectItem>
                            <SelectItem value='long'>Долговременная</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button className='font-label' type='submit' disabled={!title.trim()}>Добавить</Button>
            </form>
        </div>

    );
}