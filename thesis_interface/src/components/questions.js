const PostQuestions = (props) => {

    const Choices = [
        { title: props.choice1 },
        { title: props.choice2 },
        { title: props.choice3 }
    ]

    const handleSubmit = () => {
        props.submit(props.id)
    }

    return ( <div className="w-screen h-screen flex justify-center items-center">
        <div className="bg-black w-full h-full opacity-75"></div>
        <div className="bg-white flex flex-col items-center py-5 px-14 absolute">
            <p className="font-mono font-bold text-cyan-blue text-4xl text-center">{props.question}</p>
            {Choices.map((choice, index) => (
                <div key={index} className={`${choice.title ? 'block' : 'hidden' } border-2 border-cyan-blue bg-#D9D9D9 p-2 pl-5 w-96 flex gap-4 mt-3`}>
                    <input type="radio" id="yes" name="choice" value={choice.title} className="scale-150"/>
                    <label className="font-mono font-bold text-cyan-blue text-4xl">{choice.title}</label>
                </div>
            ))}
            <div className="flex justify-end mt-5">
                <button type="submit" className="bg-cyan-blue font-bold rounded-3xl text-white p-4 w-32" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    </div> );
}
 
export default PostQuestions;