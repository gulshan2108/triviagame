import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useForm, SubmitHandler } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import './samplePaperStyle.css'

interface IData {
    question: string;
    answer: string;
}

const SamplePaper = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IData>();
    const [state, setState] = useState<IData>({
        question: '',
        answer: '',
    })

    const onSubmit: SubmitHandler<IData> = data => {
        if (state.answer.trim() === data.answer.toLowerCase().trim()) {
            toast.success("Right Answer");
            getQuestionAnswer()
            reset()
        }
        else {
            toast.error("Wrong Answer");
        }
    };

    useEffect(() => {
        getQuestionAnswer() // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getQuestionAnswer = async () => {
        await axios.get('https://jservice.io/api/random')
            .then((response: any) => {
                if (response.status === 200) {
                    setState({
                        ...state,
                        question: response.data[0].question,
                        answer: response.data[0].answer.toLowerCase()
                    })
                }
                else {
                    toast.error("There is a problem in the system.");
                }
            })
    }

    return (
        <div className='container'>
            <div className="wrapper">
                <div className='title'>
                    <h1>Sample Paper Test</h1>
                </div>
                <div className="question-header">
                    <h1>Question : </h1>
                </div>
                <div className="question">
                    <p>{state.question}</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            className={`form-input ${errors?.answer && 'error'}`}
                            placeholder="type your answer here ..."
                             {...register("answer", { required: true})}
                        />
                        {
                            errors?.answer &&
                            <div className='error'>Field is required</div>
                        }
                        <div className="button-style">
                            <button className="button button1" type="submit"> Submit </button>
                        </div>
                        <ToastContainer />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SamplePaper;