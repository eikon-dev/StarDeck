import {z} from "zod";
import useTasksStore from "../../../store/useTasksStore.ts";
import {Input} from "@/components/ui/input.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    // SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
    title: z.string().min(4, {
        message: 'Название должно содержать минимум 4 символа'
    }),
    description: z.string(),
    priority: z.enum(['low', 'med', 'high']),
    cycle: z.enum(['daily', 'long']),
})

export default function TaskForm({ onSuccess }: {onSuccess: () => void}) {
    const addTask = useTasksStore(s => s.addTask);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            priority: 'med',
            cycle: 'daily',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const newTaskInput = {
            title: values.title,
            description: values.description,
            priority: values.priority,
            cycle: values.cycle,
        }

        addTask(newTaskInput);
        onSuccess();
        form.reset();
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='title'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Название</FormLabel>
                            <FormControl>
                                <Input placeholder='Новая задача' {...field} />
                            </FormControl>
                            <FormDescription/>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='description'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel></FormLabel>
                            <FormControl>
                                <Input placeholder='Описание' {...field} />
                            </FormControl>
                            <FormDescription/>
                            <FormMessage/>
                        </FormItem>
                    )}>
                </FormField>
                <FormField
                    control={form.control}
                    name='priority'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Приоритет</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange}
                                        defaultValue={field.value}>
                                    <SelectTrigger className='font-label'>
                                        <SelectValue placeholder='Выберите приоритет'/>
                                    </SelectTrigger>
                                    <SelectContent className='font-label'>
                                        <SelectGroup>
                                            <SelectItem value='low'>Низкий</SelectItem>
                                            <SelectItem value='med'>Средний</SelectItem>
                                            <SelectItem value='high'>Высокий</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription/>
                            <FormMessage/>
                        </FormItem>
                    )}>
                </FormField>
                <FormField
                    control={form.control}
                    name='cycle'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Тип задачи</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange}
                                        defaultValue={field.value}>
                                    <SelectTrigger className='font-label'>
                                        <SelectValue placeholder='Выберите тип задачи'/>
                                    </SelectTrigger>
                                    <SelectContent className='font-label'>
                                        <SelectGroup>
                                            <SelectItem value='daily'>Ежедневная</SelectItem>
                                            <SelectItem value='long'>Долговременная</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription/>
                            <FormMessage/>
                        </FormItem>
                    )}>
                </FormField>
                <Button type='submit'>Создать</Button>
            </form>
        </Form>

    );
}