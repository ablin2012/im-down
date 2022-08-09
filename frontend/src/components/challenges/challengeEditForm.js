import React from 'react';
import axios, { post } from 'axios';
import { withRouter } from 'react-router-dom';
import './challengeModal.css'

class ChallengeEditForm extends React.Component {
    constructor(props) {
        super(props);
        
        // debugger
        this.state = {
            title: this.props.challenge.title,
            description: this.props.challenge.description,
            newChallenge: "",
            category: this.props.challenge.category,
            startDate: this.props.challenge.startDate.slice(0,10),
            endDate: this.props.challenge.endDate.slice(0,10),
            imageFile: this.props.challenge.imageUrl,
            imageUrl: null,
            url: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ newChallenge: nextProps.newChallenge.title });
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData() 
        formData.append("imageUrl",this.state.imageFile)
        formData.append("title",this.state.title)
        formData.append("description",this.state.description)
        formData.append("category",this.state.category)
        formData.append("startDate",this.state.startDate)
        formData.append("endDate",this.state.endDate)
        this.props.updateChallenge(this.props.challenge._id, formData)
            .then(() => {
                    this.props.fetchChallenge(this.props.challenge._id)
                }).then(this.props.closeModal())
    }

    handleFile(e) {
        // events has built in currentTarget and files methods
        const file = e.currentTarget.files[0]
        
        const fileReader = new FileReader();
        
        fileReader.onloadend = () => {
            this.setState({imageFile: file, imageUrl: fileReader.result})
        }

        if (file) {
            fileReader.readAsDataURL(file) //the readAsDataURL initiates the beginning of reading of the file
        }
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    render() {
        if (!this.props.challenge) {return null}
        const previewImg = this.state.imageUrl ? <div className="image-preview"><img src={this.state.imageUrl} /></div> : null;
        const uploadBox = (
            <div className='dotted-border'>
                <div className='input-container'>
                    <label className='img-input-label' htmlFor='image-input'>
                        <span className="material-symbols-outlined">
                            file_upload
                        </span>
                        <p>Have a picture that helps explain your challenge?</p>
                        <p>Drop it here</p>
                    </label>
                    <input type="file"
                        id="image-input"
                        className="image-upload-box"
                        onChange={this.handleFile} />
                    {previewImg}
                </div>
            </div>
        )

        return (
            <div className='challenge-form-modal'>
                <div className='challenge-form-head'>
                    <h2>Let's Make the Challenge!</h2>
                    <p>Make your challenge. Send it out. See who's DOWN!</p>
                    </div>
                <form className='challenge-form' onSubmit={this.handleSubmit}>
                    <div className='challenge-form-body'>
                        <div className='img-upload-container'>
                            {this.state.imageUrl ? previewImg : uploadBox}
                        </div>
                        <div className='challenge-form-inputs'>
                            <input className='challenge-input'
                                type="text"
                                value={this.state.title}
                                onChange={this.update('title')}
                                placeholder="Name your challenge"
                            />
                            <select className='challenge-categories' value={this.state.category} onChange={this.update('category')}>
                                <option disabled value="">--Choose a Category--</option>
                                <option value="Fitness">Fitness</option>
                                <option value="Learning">Learning</option>
                                <option value="Cooking">Cooking</option>
                                <option value="Travel">Travel</option>
                                <option value="Self-Care">Self-Care</option>
                                <option value="Fun">Fun</option>
                                <option value="Creative">Creative</option>
                            </select>
                            <input className='challenge-input'
                                type="text"
                                value={this.state.description}
                                onChange={this.update('description')}
                                placeholder="Describe your challenge"
                            />
                            <div className='challenge-dates-container'>
                                <p>Set the dates of your challenge</p>
                                <div className='challenge-inputs'>
                                    <div>
                                        <label>Start</label>
                                        <input type="date" min={new Date().toLocaleDateString('en-ca')} value={this.state.startDate} onChange={this.update('startDate')}/>
                                    </div>
                                    <div>
                                        <label>End</label>
                                        <input type="date" min={new Date().toLocaleDateString('en-ca')} value={this.state.endDate} onChange={this.update('endDate')}/>
                                    </div>
                                </div>
                            </div>
                            <div className='button-container'>
                                <input className="save-challenge" type="submit" value="Submit" />
                            </div>
                        </div>

                    </div>
                </form>
                <br />
            </div>
        )
    }
}

export default withRouter(ChallengeEditForm);
