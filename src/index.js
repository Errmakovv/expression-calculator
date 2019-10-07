function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let rpn = [], stack = [], temp = '', inf1, inf2;
    for(i=0;i<expr.length;i++){
        if (expr[i]>='0' && expr[i]<='9'){
            temp+=expr[i];
            continue;
        }
        if(expr[i]==' ') continue;
        if(temp.length!==0){
            rpn.push(+temp);
            temp="";
        }
        if (stack.length==0 || expr[i]=='(') stack.push(expr[i]);
        else 
        if (expr[i]==')'){
            while(stack[stack.length-1]!=='(' && stack.length!==0){
                rpn.push(stack.pop());
            }
            if(stack.length==0)  throw("ExpressionError: Brackets must be paired");
            stack.pop();
        } 
        else {
            while(stack.length!==0 && priority(stack[stack.length-1])>=priority(expr[i])){
                rpn.push(stack.pop());
            }
            stack.push(expr[i]);
        }
    
    }
    if(temp.length!==0){
        rpn.push(+temp);
    }
    while(stack.length!==0){
        temp=stack.pop();
        if(temp=='(')  throw("ExpressionError: Brackets must be paired");
        else
        rpn.push(temp);
    }
    for(i=0;i<rpn.length;i++){
        if(rpn[i]!=='+' && rpn[i]!=='-' && rpn[i]!=='*' && rpn[i]!=='/'){
            stack.push(rpn[i]);
            continue;
        }
        inf2=stack.pop();
        inf1=stack.pop();
        switch(rpn[i]){
            case '+': stack.push(inf1 + inf2);break;
            case '-': stack.push(inf1 - inf2);break;
            case '*': stack.push(inf1 * inf2);break;
            case '/': {
                if(inf2==0)  throw("TypeError: Division by zero.");
                else stack.push(inf1/inf2);
            };break;
        }
        
    }
    return stack.pop();
}

function priority(sym){
    switch(sym){
        case '(': return 0;
        case ')': return 0;
        case '+': return 1;
        case '-': return 1;
        case '*': return 2;
        case '/': return 2;
        default : return -1;
    }
}

module.exports = {
    expressionCalculator
}