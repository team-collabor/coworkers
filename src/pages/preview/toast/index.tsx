import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import { useToast } from '@/hooks/useToast';

export default function ToastPreviewPage() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-4">
      <div>Toast</div>
      <Button
        buttonStyle={ButtonStyle.Box}
        textColor={TextColor.White}
        textSize={TextSize.Medium}
        buttonWidth={ButtonWidth.Fit}
        buttonBackgroundColor={ButtonBackgroundColor.Green}
        buttonBorderColor={ButtonBorderColor.Green}
        buttonPadding={ButtonPadding.Medium}
        onClick={() => {
          toast({
            title: 'Toast',
            description: 'Toast',
          });
        }}
      >
        Toast
      </Button>

      <Button
        buttonStyle={ButtonStyle.Box}
        textColor={TextColor.White}
        textSize={TextSize.Medium}
        buttonWidth={ButtonWidth.Fit}
        buttonBackgroundColor={ButtonBackgroundColor.Red}
        buttonBorderColor={ButtonBorderColor.None}
        buttonPadding={ButtonPadding.Medium}
        onClick={() => {
          toast({
            title: 'Toast',
            description: 'Toast',
            variant: 'destructive',
          });
        }}
      >
        Destructive Toast
      </Button>

      <Button
        buttonStyle={ButtonStyle.Box}
        textColor={TextColor.White}
        textSize={TextSize.Medium}
        buttonWidth={ButtonWidth.Fit}
        buttonBackgroundColor={ButtonBackgroundColor.Green}
        buttonBorderColor={ButtonBorderColor.None}
        buttonPadding={ButtonPadding.Medium}
        onClick={() => {
          toast({
            title: 'Toast',
            description: 'Toast',
            action: (
              <Button
                buttonStyle={ButtonStyle.Box}
                textColor={TextColor.White}
                textSize={TextSize.Medium}
                buttonWidth={ButtonWidth.Fit}
                buttonBackgroundColor={ButtonBackgroundColor.Green}
                buttonBorderColor={ButtonBorderColor.Green}
                buttonPadding={ButtonPadding.Medium}
                onClick={() => {}}
              >
                재시도
              </Button>
            ),
          });
        }}
      >
        Toast with Action
      </Button>

      <Button
        buttonStyle={ButtonStyle.Box}
        textColor={TextColor.White}
        textSize={TextSize.Medium}
        buttonWidth={ButtonWidth.Fit}
        buttonBackgroundColor={ButtonBackgroundColor.Red}
        buttonBorderColor={ButtonBorderColor.None}
        buttonPadding={ButtonPadding.Medium}
        onClick={() => {
          toast({
            title: 'Toast',
            description: 'Toast',
            variant: 'destructive',
            action: (
              <Button
                buttonStyle={ButtonStyle.Box}
                textColor={TextColor.White}
                textSize={TextSize.Medium}
                buttonWidth={ButtonWidth.Fit}
                buttonBackgroundColor={ButtonBackgroundColor.Red}
                buttonBorderColor={ButtonBorderColor.None}
                buttonPadding={ButtonPadding.Medium}
                onClick={() => {}}
              >
                재시도
              </Button>
            ),
          });
        }}
      >
        Toast with Destructive Action
      </Button>
    </div>
  );
}
