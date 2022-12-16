import * as components from './components';
import { create } from './create';


const useless = create( {
  components: Object.keys( components ).map( ( key ) => {
    return components[key as keyof typeof components]
  })
} )

export default useless
export const install = useless.install
