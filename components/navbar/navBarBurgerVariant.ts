import {Variants} from 'framer-motion';

export const containerVariants:Variants = {
    hidden:{
    scale:0,
    opacity:0
    },
    visible:{
    scale:1,
    opacity:1,
    transition:{type:'spring', stiffness:90, delay:0.2}
    },
    openVisible:{
    scale:1,
    opacity:1,
    transition:{type:'spring', stiffness:90, delay:0.2}
        }

} 

export const middleLineVariants:Variants = {
    hover:{width:'30px'},
    openHover:{width:0},
    openHidden:{ },
    openVisible:{width:0,transition:{type:'spring',velocity:120,stiffness:140}}

} 

export const topLineVariants:Variants = {
    hover:{width:"30px"},
    visible:{translateY:-10},
    openHover:{width:['30px','30.5px'], transition:{type:['spring','spring'],ease:'easeInOut',stiffness:30,repeat:Infinity,}},
    openHidden:{rotate:0},
    openVisible:{rotate:45 }

} 

export const bottomLineVariants:Variants = {
    hover:{width:'30px'},
    visible:{translateY:10},
    openHover:{width:['30px','30.5px'], transition:{type:['spring','spring'], ease:'easeInOut',stiffness:30,repeat:Infinity}},
    openHidden:{width:'30px',rotate:0 },
    openVisible:{width:'30px',rotate:-45}
} 


export const listVariant:Variants = {
    visible:{x:0,opacity:1
    },
    hidden:{x:400,opacity:0}
    }
