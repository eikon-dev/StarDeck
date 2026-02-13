import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/shared/ui/shadcn/february2026/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel} from "@/shared/ui/shadcn/february2026/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/ui/shadcn/february2026/select";
import {saveTask} from "@/features/task-edit/model/saveTask";
import {selectTaskEditDraft} from "@/entities/task/model/selectors/selectTaskEditDraft";

const editTaskSchema = z.object({
  title: z
    .string()
    .min(4, "Название должно содержать минимум 4 символа.")
    .max(20, "Название не должно превышать 20 символов."),
  description: z
    .string()
    .max(100, "Описание не должно быть больше 100 символов.")
    .optional(),
  priority: z
    .enum(["low", "med", "high"]),
})

type Props = {
  id: string,
  onSuccess: () => void,
}

export function EditTaskForm({id, onSuccess}: Props) {
  const {title, description, priority} = selectTaskEditDraft(id);

  const form = useForm<z.infer<typeof editTaskSchema>>({
    resolver: zodResolver(editTaskSchema),
    mode: "onTouched",
    defaultValues: {
      title: title,
      description: description,
      priority: priority,
    },
  });

  function onSubmit(values: z.infer<typeof editTaskSchema>) {
    saveTask(id, values);
    onSuccess();
  }

  return (
    <form id="edit-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>

              <FieldLabel>Название</FieldLabel>

              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />

              {fieldState.error && (
                <FieldError errors={[fieldState.error]}/>
              )}

            </Field>
          )}/>
        <Controller
          name="description"
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>

              <FieldLabel>Описание</FieldLabel>

              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />

              {fieldState.error && (
                <FieldError errors={[fieldState.error]}/>
              )}

            </Field>
          )}/>
          <Controller
            name="priority"
            control={form.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Приоритет</FieldLabel>

                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Укажите приоритет" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="low">Низкий</SelectItem>
                      <SelectItem value="med">Средний</SelectItem>
                      <SelectItem value="high">Высокий</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {fieldState.error && (
                  <FieldError errors={[fieldState.error]}>
                    Пожалуйста укажите приоритет
                  </FieldError>
                )}

              </Field>
            )}
          />
      </FieldGroup>
    </form>
  );
}