import { TaskCategory } from '@prisma/client';

export type TaskProps = {
  uuid: string;
  userId: bigint;
  title: string;
  description: string | null;
  category: TaskCategory;
  recurrenceRule: string | null;
  deadline: Date | null;
  id?: bigint;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Task {
  public constructor(readonly props: TaskProps) {}

  get uuid(): string {
    return this.props.uuid;
  }
  get userId(): bigint {
    return this.props.userId;
  }
  get title(): string {
    return this.props.title;
  }
  get description(): string | null {
    return this.props.description;
  }
  get category(): TaskCategory {
    return this.props.category;
  }
  get recurrenceRule(): string | null {
    return this.props.recurrenceRule;
  }
  get deadline(): Date | null {
    return this.props.deadline;
  }
  get id(): bigint | undefined {
    return this.props.id;
  }
  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }
  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
