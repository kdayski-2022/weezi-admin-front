import React from 'react';
import { useInput } from 'ra-core';

import LessonTest from './LessonTest'


const CourseResultInput = (props) => {
    const testData = [{
        id: '1',
        type: 'test',
        title: 'Тест 1',
        questions: []
    }]
    const {
        classes: classesOverride,
        configureQuill,
        helperText,
        label,
        source,
        refSource,
        resource,
        variant,
        ...rest
    } = props;

    const {
        input: { value, onChange }
    } = useInput({ source, ...rest });

    const valueType = useInput({ source: "type", ...rest });

    // const [components, setComponents] = React.useState(testData)

    const changeData = (data) => {
        console.log('changeData', data)
        let findData = Object.values(components).find((obj, index) => obj.id === data.id)
        let findDataIndex = components.indexOf(findData)
        let newComponents = JSON.parse(JSON.stringify(components))
        newComponents[findDataIndex] = data
        setComponents([...newComponents])
        // TODO TEMP OLD TEST CONVERTER


        if (data && "questions" in data) {
            let oldTestFormat = []
            data.questions.forEach(question => {
                let checkboxes = []
                let correct = 0
                question.options.forEach((opt, index) => {
                    console.log(opt.title, opt.correct)
                    if (opt.correct) {
                        correct = index + 1
                    }
                    checkboxes.push(opt.title)
                })
                console.log(question.options)
                if (question.options.length > 0) {
                    console.log('Все равно добавляем')
                    oldTestFormat.push({
                        id: question.id,
                        label: question.title,
                        checkboxes,
                        correct
                    })
                }
            })
            console.log('oldTestFormat', oldTestFormat)
            onChange(JSON.stringify(oldTestFormat));
        }


    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log('valueType', valueType)
    let dataComponent
    if (value) {
        console.log('value', value)
        dataComponent = JSON.parse(value)
    }
    else
        dataComponent = []
    //OLD TEST FORMAT CONVERTER
    if (Array.isArray(dataComponent) && dataComponent.length && "checkboxes" in dataComponent[0]) {
        //convert to new object
        let newData = { id: '1', type: 'test', title: 'test', questions: [] }
        dataComponent.forEach(element => {
            let newQestion = {
                id: element.id,
                title: element.label,
                options: []
            }
            element.checkboxes.forEach((checkbox, index) => {
                newQestion.options.push({
                    id: Math.random().toString(36).slice(2),
                    correct: (element.correct === index + 1) ? true : false,
                    value: 0,
                    title: checkbox
                }
                )
            })
            newData.questions.push(newQestion)
        });
        dataComponent = [newData]
    }

    if (dataComponent.length === 0) {
        dataComponent = testData
    }
    const [components, setComponents] = React.useState(dataComponent)

    return (

        <div> {valueType.input.value === 'test' ? components.map((component) => {
            return <LessonTest data={component} changeData={changeData} />
        }) : ''}</div>
    );
};

export default TestInput;
