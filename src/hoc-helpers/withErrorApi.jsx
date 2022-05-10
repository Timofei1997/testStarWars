import { useState} from 'react';
import ErrorMessage from '@components/ErrorMessage'

export const withErrorApi = View => {
    

    return props => {
        const [errorApi, seterrorApi] = useState(false)
        return(
<>
    {errorApi
    ? <ErrorMessage/>
    : (
    <View
    seterrorApi={seterrorApi}
{...props}
    />
    )
  }
        </>
        )
    }
} 