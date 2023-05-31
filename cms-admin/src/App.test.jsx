import React from 'react';
// import { expect, it } from 'vitest'
// 1 describe what the test does

// 2 render the component

// 3 preform the action

// 4 make an assertion


const func = () =>{
    return true
}



it('should return true', () => {
    
    const result = func()
    expect(result).toBe(true)
})