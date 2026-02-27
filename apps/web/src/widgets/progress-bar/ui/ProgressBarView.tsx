import {Field, FieldLabel} from "@/shared/ui/field"
import {Progress} from "@/shared/ui/progress"

type Props = {
  progress: number,
  doneDaily: number,
  totalDaily: number,
}

export default function ProgressBarView({progress, doneDaily, totalDaily}: Props) {
  //TODO: current version v1 wait v2
  //TODO: Переработать визуальный стиль, расположение, добавить эффекты заполнения прогресса
  return (
    <div>
      <Field className="w-full max-w-sm">
        <FieldLabel htmlFor="progress-upload">
          <span>Прогресс выполнения</span>
          <span className="ml-auto">{doneDaily} из {totalDaily}</span>
        </FieldLabel>
        <Progress
          value={progress}
          id="progress-upload"
          className="h-6 [&>div]:bg-green-500 bg-bg-deep"
        />
      </Field>
    </div>
  );
}