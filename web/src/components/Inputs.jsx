import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Radio, Select, Upload } from 'antd';
import { Icon } from '.';
import { cuiIsValid, mailIsValied, nitIsValid, passwordIsValid, phoneNumberIsValid } from '@/utilities';

export default function Inputs({ arr, options }) {
    const [showPass, setShowPass] = useState(false);

    const renderUploadFile = (item, i) => (
        <div className={`text-center col-md-${item.col ? item.col : 12}`} key={i}>
            <Form.Item name={item.name} rules={[{ required: item.disabled ? false : item.required, message: `El campo es obligatorio` }]}>
                <Upload
                    multiple={item.multiple}
                    accept={item.accept}
                    customRequest={({ onSuccess }) => onSuccess('Ok')}
                    onChange={info => (info.file.status = 'done')}
                    required={item.required}
                >
                    <Button type='dashed' icon={<Icon.Upload />} block disabled={item.disabled}>
                        {item.label}
                    </Button>
                </Upload>
            </Form.Item>
        </div>
    );

    const renderTextArea = (item, i) => (
        <div className={`col-md-${item.col ? item.col : 12}`} key={i}>
            <Form.Item
                label={item.label}
                name={item.name}
                rules={[{ required: item.disabled ? false : item.required, message: `El campo es obligatorio` }]}
            >
                <Input.TextArea
                    cols={3}
                    placeholder={`Ingrese ${String(item.label).toLowerCase()}`}
                    required={item.required}
                    disabled={item.disabled}
                />
            </Form.Item>
        </div>
    );

    const renderRadioButton = (item, i) => (
        <div className={`text-center col-md-${item.col ? item.col : 12}`} key={i}>
            <Form.Item
                label={item.label}
                name={item.name}
                rules={[{ required: item.disabled ? false : item.required, message: `El campo es obligatorio` }]}
            >
                <Radio.Group>
                    {item.options &&
                        item.options.map((opt, i) => (
                            <Radio value={opt} key={i} disabled={item.disabled}>
                                {opt}
                            </Radio>
                        ))}
                </Radio.Group>
            </Form.Item>
        </div>
    );

    const renderInputText = (item, i) => (
        <div className={`col-md-${item.col ? item.col : 12}`} key={i}>
            <Form.Item
                label={<div className={`${item.hide ? 'text-white' : 'text-black'}`}>{item.label}</div>}
                name={item.name}
                rules={[
                    {
                        required: item.disabled ? false : item.required,
                        // message: `El campo es obligatorio`,
                        validator: async (_, val) => {
                            if (item.validation_type && item.required && !item.disabled) {
                                let error = null;
                                if (item.validation_type === 1) error = passwordIsValid(val, null);
                                if (item.validation_type === 2) error = mailIsValied(val);
                                if (item.validation_type === 3) error = nitIsValid(val);
                                if (item.validation_type === 4) error = cuiIsValid(val);
                                if (item.validation_type === 5) error = phoneNumberIsValid(val);
                                if (error) throw new Error(error);
                            } else if (item.required && String(val).trim() === '') throw new Error('El campo es obligatorio');
                        }
                    }
                ]}
            >
                <Input
                    type={item.validation_type && item.validation_type === 1 && !showPass ? 'password' : 'text'}
                    disabled={item.disabled}
                    placeholder={`Ingrese ${String(item.label).toLowerCase()}`}
                    required={item.required}
                    suffix={
                        item.validation_type && item.validation_type === 1 ? (
                            <Button
                                size='small'
                                type='text'
                                icon={showPass ? <Icon.Eye /> : <Icon.EyeInvisible />}
                                onClick={() => setShowPass(!showPass)}
                            />
                        ) : null
                    }
                />
            </Form.Item>
        </div>
    );

    const renderInputDate = (item, i) => (
        <div className={`col-md-${item.col ? item.col : 12}`} key={i}>
            <Form.Item
                label={<div className={`${item.hide ? 'text-white' : 'text-black'}`}>{item.label}</div>}
                name={item.name}
                rules={[{ required: item.disabled ? false : item.required, message: `El campo es obligatorio` }]}
            >
                <DatePicker format='DD/MM/YYYY' placeholder='DD/MM/YYYY' disabled={item.disabled} className='w-100' />
            </Form.Item>
        </div>
    );

    const renderSelected = (item, i) => (
        <div className={`col-md-${item.col ? item.col : 12}`} key={i}>
            <Form.Item
                label={item.label}
                name={item.name}
                rules={[{ required: item.disabled ? false : item.required, message: `El campo es obligatorio` }]}
            >
                <Select
                    placeholder='Seleccione una opción'
                    disabled={item.disabled}
                    showSearch
                    mode={item.multiple ? 'multiple' : undefined}
                    autoClearSearchValue
                    optionFilterProp='children'
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    required={item.required}
                >
                    {item.options &&
                        item.options.map((opt, i) => (
                            <Select.Option key={i} value={opt}>
                                {opt}
                            </Select.Option>
                        ))}
                    {options &&
                        item.opt &&
                        item.opt.name &&
                        Array.isArray(options[item.opt.name]) &&
                        options[item.opt.name].map(_item => (
                            <Select.Option key={_item[item.opt.key]} value={_item[item.opt.key]}>
                                {_item[item.opt.value]}
                            </Select.Option>
                        ))}
                </Select>
            </Form.Item>
        </div>
    );

    const renderInputNumber = (item, i) => (
        <div className={`col-md-${item.col ? item.col : 12}`} key={i}>
            <Form.Item
                label={item.label}
                name={item.name}
                rules={[{ required: item.disabled ? false : item.required, message: `El campo es obligatorio` }]}
            >
                <InputNumber
                    className='w-100'
                    placeholder={`Ingrese ${String(item.label).toLowerCase()}`}
                    max={item.max}
                    min={item.min}
                    disabled={item.disabled}
                    formatter={value => (item.format ? `Q ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : value)}
                    parser={value => (item.format ? value.replace(/\Q\s?|(,*)/g, '') : value)}
                />
            </Form.Item>
        </div>
    );

    return (
        <div className='row'>
            {arr.map((item, i) => {
                return item.id == '1'
                    ? renderUploadFile(item, i)
                    : item.id == '2'
                    ? renderTextArea(item, i)
                    : item.id === '3'
                    ? renderRadioButton(item, i)
                    : item.id === '4'
                    ? renderInputText(item, i)
                    : item.id === '5'
                    ? renderInputDate(item, i)
                    : item.id === '6'
                    ? renderSelected(item, i)
                    : item.id === '7'
                    ? renderInputNumber(item, i)
                    : null;
            })}
        </div>
    );
}
