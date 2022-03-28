import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';

@Injectable()
export class OwnerColumnsGuard implements CanActivate {
  constructor(private columnsService: ColumnsService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const url = req.url;
      const columnId = url.split('/')[2];

      const column = await this.columnsService.getColumnById(columnId);

      if (req.user.id !== column.user_id) {
        throw new ForbiddenException({ message: 'Отсутствует доступ' });
      }
      return true;
    } catch (e) {
      console.log(e.message, e.name);
      throw e;
    }
  }
}
