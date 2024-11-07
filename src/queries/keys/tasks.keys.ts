import {
  GetTaskDetailRequest,
  GetTaskRequest,
} from '@/types/dto/requests/tasks.request.types';
import { formatDate } from '@/utils/dateTimeUtils/FormatData';

export const tasksQueryKeys = {
  tasks: (params?: GetTaskRequest) => {
    if (params?.date) {
      params.date = formatDate(params.date);
      return ['tasks', params];
    }
    return ['tasks'];
  },
  taskDetail: (params: GetTaskDetailRequest) => {
    return ['taskDetail', params];
  },
};
