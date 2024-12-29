import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';
import { TextInputProps, Keyboard } from 'react-native';
import { shade } from 'polished';
import { Container, TextInput, Icon } from './styles';
import {
  mascararCNPJ,
  mascararCEP,
  mascararTelefone,
  mascararCPF,
  mascararData,
} from '../../utils/masks';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  type: string;
  placeholder: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const MaskedInput: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, type, placeholder, value, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue, fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [valorCampo, setValorCampo] = useState(value);
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = ref;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, []);

  const applyMask = useCallback(
    maskedValue => {
      if (type === 'cnpj') {
        inputValueRef.current.value = mascararCNPJ(maskedValue);
        setValorCampo(mascararCNPJ(maskedValue));
      } else if (type === 'cep') {
        const formatado = mascararCEP(maskedValue);
        inputValueRef.current.value = mascararCEP(maskedValue);
        setValorCampo(mascararCEP(maskedValue));
      } else if (type === 'cellphone') {
        const formatado = mascararTelefone(maskedValue);
        inputValueRef.current.value = mascararTelefone(maskedValue);
        setValorCampo(mascararTelefone(maskedValue));
      } else if (type === 'cpf') {
        inputValueRef.current.value = mascararCPF(maskedValue);
        setValorCampo(mascararCPF(maskedValue));
      } else if (type === 'data') {
        inputValueRef.current.value = mascararData(maskedValue);
        setValorCampo(mascararData(maskedValue));
      }
    },
    [type],
  );

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? shade(0.4, '#999') : '#999'}
      />

      <TextInput
        value={valorCampo}
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholder={placeholder}
        placeholderTextColor="#999"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={value => {
          applyMask(value);
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(MaskedInput);
