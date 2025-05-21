import { useToastContext } from '@/context/toastContext';

export const useToast = () => {
  const { showToast } = useToastContext();
  return showToast;
};