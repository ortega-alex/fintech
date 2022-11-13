import React, { useRef, useState } from 'react';
import { Button, Divider, Form, Input, Radio, Select } from 'antd';

import { Inputs } from '@/components';
import { replaceAccents, replaceWhiteSpaceByCharacter } from '@/utilities';
import propertyes from '@/assests/files/input-types.json';
import fileTypes from '@/assests/files/file-types.json';
import validationTypes from '@/assests/files/validation-type.json';

export default function SettingsForm({ onClose }) {
    const refForm = useRef();
    // const [disabled, setDisabled] = useState(false);
    const [renderInput, setRenderInput] = useState(null);
    let [input, setInput] = useState({});

    const renderViewInputs = input => setRenderInput(<Inputs arr={[input]} />);
    const handleOnChangeValues = obj => {
        const name = Object.keys(obj)[0];
        const value = Object.values(obj)[0];
        // let _disabled = false;
        if (name === 'id') {
            refForm.current.setFieldsValue({
                title: '',
                required: '',
                file_types: undefined,
                options: undefined,
                type: undefined
            });
            let result = propertyes.find(item => item.id == value);
            if (result) input = { ...result };
        }
        if (name === 'title') {
            input.label = value;
            input.name = String(replaceWhiteSpaceByCharacter(replaceAccents(value), '_')).toLowerCase();
        }
        if (name === 'required') {
            input.required = value === '1' ? true : false;
        }
        if (name === 'file_types') {
            input.accept = value.length > 0 ? value.toString() : '*';
        }
        if (name === 'options') {
            input.options = value;
        }
        if (name === 'type') {
            input.multiple = value === '1' ? true : false;
        }
        if (name === 'validation_type') {
            input.validation_type = value;
        }
        // if (input.id > 6) {
        //     _disabled = true;
        //     refForm.current.setFieldsValue({ title: input.title });
        // }
        if (name === 'format') {
            input.format = value === '1' ? true : false;
        }
        // setDisabled(_disabled);
        setInput(input);
        renderViewInputs(input);
    };

    const handleSubmitNewProps = () => {
        refForm.current.resetFields();
        onClose(input);
    };

    return (
        <Form layout='vertical' autoComplete='off' onValuesChange={handleOnChangeValues} onFinish={handleSubmitNewProps} ref={refForm}>
            <div className='row'>
                <div className='col-md-6'>
                    <Form.Item label='Tipo de entrada' name='id' required={[{ required: true, message: 'Seleccione un campo' }]}>
                        <Select placeholder='Seleccione una opción'>
                            {propertyes.map(item => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <div className='col-md-6'>
                    <Form.Item label='Titulo' name='title' required={[{ required: true, message: 'Ingrese un titulo' }]}>
                        <Input
                            placeholder='Ingrese un titulo'
                            // disabled={disabled}
                        />
                    </Form.Item>
                </div>
            </div>
            <div className='row'>
                <div className={`col-md-${input && input.id === '6' ? '4' : '6'} `}>
                    <Form.Item label='Requerido' name='required'>
                        <Radio.Group>
                            <Radio value='1'>Sí</Radio>
                            <Radio value='0'>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                {input && input.id === '1' && (
                    <div className='col-md-6'>
                        <Form.Item label='Tipos de archivos permitidos' name='file_types'>
                            <Select placeholder='Seleccione las opciones deseadas' mode='tags'>
                                {fileTypes.map(item => (
                                    <Select.Option key={item.name}>{item.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                )}
                {input && input.id === '6' && (
                    <div className={`col-md-${input && input.id === '6' ? '4' : '6'} `}>
                        <Form.Item label='Tipo' name='type'>
                            <Radio.Group>
                                <Radio value='1'>Multiple</Radio>
                                <Radio value='0'>Unico</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                )}
                {input && input.id === '7' && (
                    <div className={`col-md-${input && input.id === '6' ? '4' : '6'} `}>
                        <Form.Item label='Formato' name='format'>
                            <Radio.Group defaultValue='0'>
                                <Radio value='0'>Numero</Radio>
                                <Radio value='1'>Moneda</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                )}
                {input && (input.id === '3' || input.id === '6') && (
                    <div className={`col-md-${input && input.id === '6' ? '4' : '6'} `}>
                        <Form.Item label='Opciones' name='options'>
                            <Select placeholder='Ingrese las opciones' mode='tags' />
                        </Form.Item>
                    </div>
                )}
                {input && input.id === '4' && (
                    <div className='col-md-6'>
                        <Form.Item label='Tipo de validacion' name='validation_type'>
                            <Select placeholder='Seleccione una opción' allowClear>
                                {validationTypes.map(item => (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                )}
            </div>
            <Divider plain className='line-divide'>
                Ejemplo
            </Divider>
            {renderInput}
            <div className='text-right mt-3'>
                <Button htmlType='submit' type='primary'>
                    Agregar
                </Button>
            </div>
        </Form>
    );
}
