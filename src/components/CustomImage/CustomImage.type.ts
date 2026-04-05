import { ImageProps } from 'next/image';
import React from 'react';

export type TCustomImageProps = {
  className?: string;
  parentClassName?: React.ComponentProps<'div'>['className'];
} & ImageProps;
