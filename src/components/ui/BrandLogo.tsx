import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'mark' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const ASSET_MAP: Record<
  NonNullable<BrandLogoProps['variant']>,
  { src: string; width: number; height: number }
> = {
  light: {
    src: `${BASE_PATH}/brand/vectisx-logo-light.png`,
    width: 1240,
    height: 239,
  },
  dark: {
    src: `${BASE_PATH}/brand/vectisx-logo-dark.png`,
    width: 1240,
    height: 239,
  },
  mark: {
    src: `${BASE_PATH}/brand/vectisx-mark.png`,
    width: 446,
    height: 239,
  },
  icon: {
    src: `${BASE_PATH}/brand/vectisx-icon.png`,
    width: 192,
    height: 192,
  },
};

const SIZE_CLASSES: Record<NonNullable<BrandLogoProps['size']>, string> = {
  sm: 'h-7 w-auto',
  md: 'h-8 sm:h-9 w-auto',
  lg: 'h-10 sm:h-11 w-auto',
};

export default function BrandLogo({
  variant = 'light',
  size = 'md',
  className = '',
}: BrandLogoProps) {
  const asset = ASSET_MAP[variant];

  return (
    <Image
      src={asset.src}
      alt="VectisX"
      width={asset.width}
      height={asset.height}
      unoptimized
      className={`${SIZE_CLASSES[size]} select-none object-contain ${className}`.trim()}
    />
  );
}
