import React from 'react';



const Button = (props) => {

    return (
        <div className="button-comp-section" onClick={props.changeRef}>
            {props.name === "=" ?
                (<button className="common-button-style square-button">
                    {props.name}
                </button>)
                :
                (
                    <div>
                        {props.mathVal === "true" ?
                            (<button className="common-button-style circular-button-mathVal">
                                {props.name}
                            </button>)
                            :
                            (<button className="common-button-style circular-button">
                                {props.name}
                            </button>)
                        }

                    </div>
                )
            }
        </div>

    );
}

export default Button;