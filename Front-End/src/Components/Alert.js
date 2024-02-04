import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useGlobalContext } from '../Utilities/Context'
import '../Styles/alert.css'
const Alert = () => {
    const { alert, hideAlert } = useGlobalContext()
    useEffect(() => {
        const myTime = setTimeout(() => {
            hideAlert()
        }, 3000);
        return () => {
            clearTimeout(myTime)
        };
    }, [alert?.condition, hideAlert]);

    return (
        <div className={`my-alert ${alert?.condition ? 'show-alert' : 'hide-alert'
            }`}
            style={{
                backgroundColor: `${alert?.type === 'success' ? 'var(--success)' : ''}
                                  ${alert?.type === 'danger' ? 'var(--danger)' : ''}
                                  ${alert?.type === 'info' ? 'var(--info)' : ''}
  `,
                color: `${alert?.type === 'success' ? 'var(----alert-check-success)' : ''}
                        ${alert?.type === 'danger' ? 'var(----alert-check-danger)' : ''}
                        ${alert?.type === 'info' ? 'var(----alert-check-info)' : ''}`,
                borderColor: `${alert?.type === 'success' ? 'var(----alert-check-success)' : ''}
                              ${alert?.type === 'danger' ? 'var(----alert-check-danger)' : ''}
                              ${alert?.type === 'info' ? 'var(----alert-check-info)' : ''}`
            }}
            role="alert">
            <p className="mb-0 text-center"
                style={{
                    marginInline: 'auto'
                }}
            >{alert?.msg}</p>
            <button
                onClick={hideAlert}
                className="cls-btn">
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>

    )
}

export default Alert