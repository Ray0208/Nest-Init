import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的response对象
    const status = exception.getStatus(); // 获取异常状态码
    const exceptionResonse = exception.getResponse();
    let validMessage = '';

    for (const key in exception) {
      console.log(key, exception[key]);
    }
    if (typeof exceptionResonse === 'object') {
      validMessage =
        typeof exceptionResonse.message === 'string'
          ? exceptionResonse.message
          : exceptionResonse.message[0];
    }

    // 设置错误对象
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Internal Server Error' : 'Bad Request'}`;
    const errorResponse = {
      data: {},
      message: validMessage || message,
      code: -1,
    };

    // 设置返回状态码，请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
