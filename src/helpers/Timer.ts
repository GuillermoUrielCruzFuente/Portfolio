const timer = (ms: number) => { return new Promise(res => setTimeout(res, ms)) }

export default timer