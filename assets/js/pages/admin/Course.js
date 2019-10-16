import React from 'react';
import LatexRenderer from './LatexRenderer';
import PulseLoader from '../../components/PulseLoader';

const TextAreaRow = ({ label, value, onChange }) => {
    return (
        <div className="form-row react__textarearow">
            <div className="form-group col-12">
                <label htmlFor="question" className="font-weight-bold">
                    {label}
                </label>
                <LatexRenderer text={value} />
                <textarea className="form-control form-small" onChange={({ target }) => onChange(target.value)} />
            </div>
        </div>
    );
};

class Course extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: '',
            answer: 'A',
            options: [],
            course: null,
        };

        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        fetch('/api/courses')
            .then(res => res.json())
            .then(courses => this.setState({ courses}))
            .catch(error => console.log(error));
    }

    handleOnChange(key, value) {
        this.setState({ [key]: value });
    }

    handleOptionChange(offset, value) {
        this.setState(({options}) => ({ options: [
                ...options.slice(0, offset),
                value,
                ...options.slice(offset + 1)
            ] }));
    }

    onSubmit(e) {
        e && e.preventDefault();
        console.log(this.state);
    }

    onKeyPress(e) {
        if (e.key === 'Enter' && e.ctrlKey)
            this.onSubmit();
    }

    render() {
        const { question, courses, options } = this.state;
        if (!courses) return <PulseLoader />;

        const CourseSelect = () => {
            return (
                <select
                    className="select--custom"
                    onChange={({ target }) => this.handleOnChange('course', target.value)}>
                    {
                        courses.map(c => (<option value={c._id} key={c._id}>{c.code}</option>))
                    }
                </select>
            );
        };

        return (
            <div className="container mt-3 mt-sm-3" onKeyPress={this.onKeyPress}>
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8">
                        <h6 className="text-uppercase">Upload University Course</h6>
                        <p>
                            Fluctuis sunt mineraliss de neuter fermium. Est fortis triticum, cesaris.
                        </p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8">
                        <form action="#" onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-12 py-3 px-2">
                                    <button className="btn btn-primary btn-sm" type="submit">
                                        Upload Question
                                    </button>
                                    <CourseSelect />
                                    <select
                                        className="select--custom"
                                        onChange={({ target }) => this.handleOnChange('answer', target.value)}>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                    </select>
                                </div>
                            </div>
                            <TextAreaRow
                                label="What is the question?"
                                value={question}
                                onChange={value => this.handleOnChange('question', value)}
                            />
                            <TextAreaRow
                                label="Option A"
                                value={options[0]}
                                onChange={value => this.handleOptionChange(0, value)}
                            />
                            <TextAreaRow
                                label="Option B"
                                value={options[1]}
                                onChange={value => this.handleOptionChange(1, value)}
                            />
                            <TextAreaRow
                                label="Option C"
                                value={options[2]}
                                onChange={value => this.handleOptionChange(2, value)}
                            />
                            <TextAreaRow
                                label="Option D"
                                value={options[3]}
                                onChange={value => this.handleOptionChange(3, value)}
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Course;
