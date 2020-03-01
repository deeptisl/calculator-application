import React from 'react';



const Button = (props) => {

    return (
        <div className="button-comp-section" onClick={props.changeRef}>
            {props.name === "=" ?
                (<div className="common-button-style square-button">
                    {props.name}
                </div>)
                :
                (
                    <div>
                        {props.mathVal === "true" ?
                            (<div className="common-button-style circular-button-mathVal">
                                {props.name}
                            </div>)
                            :
                            (<div className="common-button-style circular-button">
                                {props.name}
                            </div>)
                        }

                    </div>
                )
            }
        </div>

    );
}

export default Button;