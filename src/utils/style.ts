import { StyledComponentProps } from '@material-ui/core/styles';

// Types
export type StyledProps<ClassKey extends string> = Omit<StyledComponentProps<ClassKey>, 'innerRef'>