import { z } from 'zod';

// Глобальные сообщения
const errorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.too_small:
      return { message: `Минимальная длина: ${issue.minimum} символов` };
    case z.ZodIssueCode.too_big:
      return { message: `Максимальная длина: ${issue.maximum} символов` };
    // case z.ZodIssueCode.invalid_type:
    //   return { message: `Ожидается ${issue.expected}, получено ${issue.received}` };
    default:
      return { message: 'Обязательное поле' };
  }
};

// Устанавливаем глобальный errorMap
z.setErrorMap(errorMap);
