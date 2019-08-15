import React from 'react'
import './About.css'

const About = (props) => {
  const closeAbout = (event) => {
    event.preventDefault()
    props.setShowAbout(false)
  }

  return ( <div className='about-component'>
    <p>
      This is Beast.MODE, a training application and social media combined.<br/><br/>
      Idea originally came from Madbarz, but I decided to take this further and without cashing people. 
      Everybody can add their workouts, everybody can do workouts by anyone etc. You can also post 
      updates on whatever you feel appropriate. You can attach picture to each workout, update or done 
      workout. Everybody has a profile which has their picture, information(added by the user), posts, workouts, 
      done workouts, friends and activity. Maybe in the future more specific stats and so on.<br/><br/>
      Latest source code can be found on <a className='link-to-github' 
        href='https://github.com/miksa1987/Beast.Mode/'>Github.</a>
    </p>
    <a className='close-button' href='' onClick={closeAbout}><h2>X</h2></a>
  </div>)
}

export default About