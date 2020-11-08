/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger/dist';

export class LicensedDTO {
  @ApiProperty({ example: 'このデータはさけのわによって提供されています。' })
  description_ja: 'このデータはさけのわによって提供されています。';

  @ApiProperty({ example: 'This data is provided by sakenowa.' })
  description_en: 'This data is provided by sakenowa.';

  @ApiProperty({ example: 'https://sakenowa.com' })
  sakenowa_link: 'https://sakenowa.com';
};

export const LicensedDTODecorator = <TModel extends any>(model: TModel) => {
  const item = Array.isArray(model) ?
    {
      type: 'array',
      items: { $ref: getSchemaPath(model[0]) },
    } :
    {
      $ref: getSchemaPath(model as Type<any>),
    };

  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(LicensedDTO) },
          {
            properties: {
              data: item,
            },
          },
        ],
      },
    }),
  );
};