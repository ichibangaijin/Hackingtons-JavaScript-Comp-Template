//check collision for two objects
     function isTouching(player, enemy){
        if (player.x >= enemy.x+enemy.width|| player.x + player.width <= enemy.x){
            return false;   // not touching: too far to the side
        } 
        if (player.y >= enemy.y+enemy.height || player.y + player.height <= enemy.y){
            return false; // not touching: too far above or below
        } 
        else{
            return true;   // they must be touching                                     
        }
       
    }

    export default isTouching

