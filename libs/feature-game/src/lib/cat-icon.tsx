import { chakra, HTMLChakraProps, useToken } from '@cat-match/jiji';

export interface CatIconProps extends HTMLChakraProps<'svg'> {
  color?: string;
}

export function CatIcon(props: CatIconProps) {
  const { color = 'currentColor', ...svgProps } = props;
  const iconColor = useToken('colors', color);

  return (
    <chakra.svg
      data-testid="icon-cat"
      viewBox="0 0 58 40"
      width="59"
      height="40"
      fill="none"
      aria-hidden="true"
      {...svgProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.068 3.508c-.342.768-.739 2.63-.927 4.351-.348 3.18-.02 9.388.635 12.053.156.637.19 1.292.128 2.53-.065 1.31-.028 1.931.17 2.866.249 1.175.248 1.209-.043 2.142-.599 1.92-.777 3.451-.692 5.946.043 1.274.152 2.607.242 2.96l.163.644h46.591l.168-.576c.262-.899.353-3.585.163-4.823a27.835 27.835 0 0 0-.517-2.403c-.191-.72-.348-1.443-.348-1.607 0-.164.194-.873.431-1.574a11.39 11.39 0 0 0 .553-2.709c.072-.852.216-1.607.355-1.863.36-.663 1.196-3.692 1.539-5.577.438-2.41.427-5.516-.028-7.314-.942-3.727-2.253-4.741-4.644-3.594-.539.258-1.363.791-1.833 1.185-.904.758-3.492 3.348-5.574 5.58-1.425 1.526-3.461 3.05-5.12 3.83-.949.448-1.251.523-2.27.564-.987.04-1.426-.02-2.75-.38-3.444-.934-4.696-1.005-8.17-.466l-2.27.352-.583-.27c-.696-.321-3.342-2.694-4.315-3.868-.38-.459-1.453-1.895-2.384-3.192-1.733-2.416-3.333-4.193-4.408-4.898C8.74 3.012 8.673 3 7.009 3H5.294l-.226.508Zm12.711 20.11c1.627.579 2.443 1.748 2.44 3.494-.002 1.34-.319 2.02-1.156 2.482-.842.465-2.161.686-3.574.598-2.694-.167-4.417-1.441-4.185-3.094.161-1.143 1.177-2.626 2.184-3.188 1.38-.77 2.7-.86 4.291-.293Zm18.181.973c1.064.27 2.102.851 2.813 1.576 1.989 2.025 1.685 3.966-.78 4.992-1.971.821-5.712.171-7.034-1.223-.421-.444-.496-.62-.496-1.175 0-1.768 1.167-3.675 2.578-4.213.503-.191 2.086-.168 2.92.043Zm-19.86.92c-1.73 1.11-1.065 4.039.917 4.039.893 0 1.627-.758 1.855-1.915.329-1.67-1.408-3-2.773-2.124Zm18.974.845c-1.384.574-1.105 3.22.429 4.076 1.202.671 2.303.27 2.628-.957.527-1.995-1.292-3.851-3.057-3.12Zm-12.077 4.488c.514.15.992.184 1.73.12 1.208-.106 1.696.096 2.168.895.54.914.314 1.416-.785 1.75-.7.212-.74.255-1.293 1.427-.294.623-1.115 1.095-1.672.962-.61-.146-1.184-.735-1.436-1.474-.285-.832-.523-1.126-1.008-1.242-.229-.054-.428-.254-.564-.564-.192-.436-.187-.526.044-.976.312-.605 1.07-1.11 1.664-1.107.242 0 .76.095 1.152.21Z"
        fill={iconColor}
      />
    </chakra.svg>
  );
}
