import { Constructor } from '@mikro-orm/core';
import { mixin } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseBase<T> {
  success: boolean;
  data: T;
}

// Only used for documentation
export function withBaseResponse<TBase extends Constructor>(Base: TBase) {
  class BaseResponseDTO {
    @ApiProperty({
      example: true,
    })
    success?: boolean;

    @ApiProperty({
      type: Base,
    })
    data: InstanceType<TBase>;
  }
  return mixin(BaseResponseDTO);
}

// Only used for documentation
export function withBaseResponseList<TBase extends Constructor>(Base: TBase) {
  class BaseResponseDTO {
    @ApiProperty({
      example: true,
    })
    success?: boolean;

    @ApiProperty({
      type: [Base],
    })
    data: InstanceType<TBase>;
  }
  return mixin(BaseResponseDTO);
}
