const styles = `
body{
display: block;
overflow-x:hidden;
}
#globalLoader{
    position: fixed;
    z-index: 1700;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    display: flex;
    left: 0,
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}
.containera {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.item {
  width: 50px;
  height: 50px;
  position: absolute;
}

.item-1 {
  // background-color: rgb(250, 87, 103);
  // background-color: #0068fb;
  background-color: #0f1729;
  top: 0;
  left: 0;
  z-index: 1;
  animation: item-1_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

.item-2 {
  // background-color: rgb(121, 68, 228);
  background-color: #d9d9d9;
  top: 0;
  right: 0;
  animation: item-2_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

.item-3 {
  // background-color: rgb(27, 145, 247);
  // background-color: #0068fb;
  background-color: #0f1729;
  bottom: 0;
  right: 0;
  z-index: 1;
  animation: item-3_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

.item-4 {
  // background-color: rgb(250, 194, 76);
  background-color: #d9d9d9;
  bottom: 0;
  left: 0;
  animation: item-4_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

@keyframes item-1_move {
  0%, 100% {
    transform: translate(0, 0)
  }

  25% {
    transform: translate(0, 50px)
  }

  50% {
    transform: translate(50px, 50px)
  }

  75% {
    transform: translate(50px, 0)
  }
}

@keyframes item-2_move {
  0%, 100% {
    transform: translate(0, 0)
  }

  25% {
    transform: translate(-50px, 0)
  }

  50% {
    transform: translate(-50px, 50px)
  }

  75% {
    transform: translate(0, 50px)
  }
}

@keyframes item-3_move {
  0%, 100% {
    transform: translate(0, 0)
  }

  25% {
    transform: translate(0, -50px)
  }

  50% {
    transform: translate(-50px, -50px)
  }

  75% {
    transform: translate(-50px, 0)
  }
}

@keyframes item-4_move {
  0%, 100% {
    transform: translate(0, 0)
  }

  25% {
    transform: translate(50px, 0)
  }

  50% {
    transform: translate(50px, -50px)
  }

  75% {
    transform: translate(0, -50px)
  }
}
.my-text{
    color: #0f1729;
    font-size: 1.7rem;
  font-weight: 600;
}
}`;

export default styles;
