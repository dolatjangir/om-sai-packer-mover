import GetAQuotePage from './clientQuote';
import { generateSEOMetadata } from '../../../lib/seometadata'


export const generateMetadata = generateSEOMetadata;
export default  function page() {
  return (
  
    <GetAQuotePage/>
  )
}
