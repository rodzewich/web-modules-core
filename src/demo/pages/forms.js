import {
    React,
    Panel,
    TextInput,
    Checkbox,
    Radio,
    Form,
    MultiSelect,
    FormGroup,
    TextInputControl,
    RadioControl,
    CheckboxControl,
    Button,
    Row,
    Col,
    Block,
    validator
} from "../../index";

export default class Forms extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            form: {
                firstName: '',
                lastName: '',
                email: '',
                select: '',
                radio: '1',
                radioDis: '1',
                checkbox1: false,
                checkbox2: false,
                multiselect: ['foo']
            },
            errors: {}
        };
        this.onFormChange = this.onFormChange.bind(this);
    }

    onFormChange(values) {

        var errors = {};

        if (!values.firstName) {
            errors.firstName = 'Missing first name';
        }

        if (!values.lastName) {
            errors.lastName = 'Missing last name';
        }

        if (!values.email) {
            errors.email = 'Missing email';
        } else if (!validator.isEmail(values.email)) {
            errors.email = 'Not an email';
        }

        console.log('First Name Value: ', this.refs.firstName.getValue()); // direct access

        this.setState({form: values, errors: errors});

    }

    render() {

        return <div>
            <Panel header={<h1>Context-enabled form</h1>}>

                <Form value={this.state.form} errors={this.state.errors} onChange={this.onFormChange}>

                    <TextInput name="firstName" label="First Name (as password)" type="password" />
                    <TextInput name="firstName" label="First Name (readonly)" readOnly />
                    <TextInput name="firstName" label="First Name" ref="firstName"/>
                    <TextInput name="lastName" label="Last Name"/>
                    <TextInput name="email" label="Email"/>
                    <Radio name="radio" label="Radio 1" value="1"/>
                    <Radio name="radio" label="Radio 2" value="2"/>
                    <Checkbox name="checkbox1" label="Checkbox 1"/>
                    <Checkbox name="checkbox2" label="Checkbox 2"/>
                    <MultiSelect name="multiselect" label="MultiSelect" id="foo" ref="multiselect">
                        <MultiSelect.Group>
                            <MultiSelect.MasterOption label="All"/>
                            <MultiSelect.Option value="foo" label="Foo"/>
                            <MultiSelect.Option value="bar" label="Bar"/>
                        </MultiSelect.Group>
                    </MultiSelect>

                    <hr/>

                    <FormGroup name="firstName" label="First Name Disassembled">
                        <TextInputControl name="firstName"/>
                    </FormGroup>
                    <FormGroup label="Radios Disassembled">
                        <RadioControl name="radioDis" value="1">Radio 1</RadioControl>
                        <RadioControl name="radioDis" value="2">Radio 2</RadioControl>
                    </FormGroup>
                    <FormGroup label="Inline Checkboxes Disassembled">
                        <div>
                            <CheckboxControl name="checkbox1" inline>Checkbox 1</CheckboxControl>
                            <CheckboxControl name="checkbox2" inline>Checkbox 2</CheckboxControl>
                        </div>
                    </FormGroup>
                    <FormGroup label="Vertical group of radios">
                        <RadioControl>Auto-Receptionist</RadioControl>
                        <RadioControl>
                            <div>Extension:<br/>Admin User, Ext. 101<br/><Button>Select Extension</Button></div>
                        </RadioControl>
                    </FormGroup>

                    <hr/>

                    <h1>Inline fields with labels</h1>

                    <Block className="form-inline rc-form-inline">
                        <TextInput name="firstName" label="First Name" ref="firstName"/>
                        <TextInput name="lastName" label="Last Name"/>
                    </Block>

                    <h1>Inline fields with one label</h1>

                    <FormGroup label="Inline long label" name="inlineGroup">
                        <Row>
                            <Col xs={2}><TextInputControl name="firstName" placeholder="First Name"/></Col>
                            <Col xs={2}><TextInputControl name="lastName" placeholder="Last Name"/></Col>
                        </Row>
                    </FormGroup>

                </Form>

                <pre>{JSON.stringify(this.state.form, null, 2)}</pre>

            </Panel>
        </div>;
    }

}
