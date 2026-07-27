export type TaskCompletionProps = {
  taskId: bigint;
  id?: bigint;
  completedAt?: Date;
};

export class TaskCompletion {
  public constructor(readonly props: TaskCompletionProps) {}

  public get taskId(): bigint {
    return this.props.taskId;
  }
  public get id(): bigint | undefined {
    return this.props.id;
  }
  public get completedAt(): Date | undefined {
    return this.props.completedAt;
  }
}
