export const fadeInUp = {
    initial: {
        x: 40,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,

        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
}

export const fadeInDown = {
    initial: {
        x: -60,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,

        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
}

export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.5,

        }
    }
}

export const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
}