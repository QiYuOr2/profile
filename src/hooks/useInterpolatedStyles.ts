import { useState, useEffect, useCallback } from "react";

interface Rect {
  width: number;
  height: number;
  left: number;
  top: number;
}

interface UseInterpolatedStylesOptions<T> {
  element: React.RefObject<T>;
  target: React.RefObject<T>;
}

function isHTMLElement(element: unknown): element is HTMLElement {
  return !!(element as HTMLElement).getBoundingClientRect;
}

export function useInterpolatedStyles<T>({ element, target }: UseInterpolatedStylesOptions<T>) {
  const [basicStyle, setBasicStyle] = useState({ width: 0, height: 0, left: 0, top: 0 });
  const [targetStyle, setTargetStyle] = useState({ width: 0, height: 0, left: 0, top: 0 });
  const [elementStyle, setElementStyle] = useState({ width: 0, height: 0, left: 0, top: 0 });

  const setStyle = useCallback(
    <T>(ref: React.RefObject<T>, setState: React.Dispatch<React.SetStateAction<Rect>>) => {
      if (ref.current && isHTMLElement(ref.current)) {
        const rect = ref.current.getBoundingClientRect();
        setState({
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top,
        });
      }
    },
    []
  );

  useEffect(() => {
    setStyle(element, setBasicStyle);
  }, [element, setStyle]);

  useEffect(() => {
    setStyle(target, setTargetStyle);
  }, [target, setStyle]);

  const computedAvatarStyle = () => {
    const scrollTop = parallax.current.container.current.scrollTop;
    if (element.current) {
      const progress = Math.min(1, scrollTop / basicStyle.top);

      setElementStyle({
        width: basicStyle.width + progress * (targetStyle.width - basicStyle.width),
        height: basicStyle.height + progress * (targetStyle.height - basicStyle.height),
        left: basicStyle.left + progress * (targetStyle.left - basicStyle.left),
        top: basicStyle.top + progress * (targetStyle.top - basicStyle.top),
      });
    }
  };

  return {};
}
