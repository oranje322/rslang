import React from 'react';
import classes from './Team.module.scss';
import Header from '../../components/Header/Header';
import json from '../../utils/team.json'

const Team = () => {
    return (
        <>
            <Header title={'Наша Команда'} />
            <div className={classes.wrapper}>
                {json && json.members.map((member) => {
                    return <div className={classes.card} key={member.id}>
                        <img className={classes.img} src={member.photo || 'https://image.freepik.com/free-vector/blue-abstract-technology-binary-code-background_42077-7.jpg'} />
                        <div className={classes.info}>
                            <h4>{member.name}</h4>
                            <span>{member.position}</span>
                            <p>{member.activity}</p>
                            <div className={classes.nets}>
                                <a href={member.networks[0].telegram} target="_blank">
                                    <span className={classes.tg}>
                                        <img src='/src/assets/img/tg.svg' />
                                    </span>
                                </a>
                                <a href={member.networks[0].link} target="_blank">
                                    <span className={classes.link}>
                                        <img src='/src/assets/img/link.svg' />
                                    </span>
                                </a>
                                <a href={member.networks[0].github} target="_blank">
                                    <span className={classes.github}>
                                        <img src='/src/assets/img/git.svg' />
                                    </span>
                                </a>
                            </div>
                        </div>

                    </div>
                })}
            </div>
        </>
    )

}

export default Team;