import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';
import { TextInputProps } from 'react-native';
import { shade } from 'polished';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Container, TextInput, Icon, EyeIconContainer } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  placeholder: string;
  password: boolean;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, placeholder, password, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue, fieldName, error } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [showPassword, setShowPassword] = useState(true);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current?.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, []);

  function changeIcon(): void {
    if (eyeIcon === 'eye') {
      setEyeIcon('eye-off');
      setShowPassword(true);
    } else {
      setEyeIcon('eye');
      setShowPassword(false);
    }
  }

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? shade(0.4, '#999') : '#999'}
      />
      {password ? (
        <>
          <TextInput
            ref={inputElementRef}
            keyboardAppearance="dark"
            secureTextEntry={showPassword}
            placeholder={placeholder}
            placeholderTextColor="#999"
            defaultValue={defaultValue}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChangeText={value => {
              inputValueRef.current.value = value;
            }}
            {...rest}
          />

          <Icon
            name={eyeIcon}
            size={RFValue(20)}
            color={shade(0.4, '#999')}
            onPress={() => changeIcon()}
          />
        </>
      ) : (
        <TextInput
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholder={placeholder}
          placeholderTextColor="#999"
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={value => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />
      )}
    </Container>
  );
};

export default forwardRef(Input);
