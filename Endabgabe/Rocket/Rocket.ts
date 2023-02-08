namespace Feuerwerk {
    export abstract class Rocket {

        public position: Vector;
        public name: string;
        public color1: string;
        public color2: string;
        public alpha: number;
        //public explosion: Vector;

        constructor(_position: Vector, _name: string, _color1: string, _color2: string) {

            this.position = _position;
            this.name = _name;
            this.color1 = _color1;
            this.color2 = _color2;
            this.alpha = 1;
            //this.explosion = _explosion;
        }

        public abstract draw(): void;

        public abstract update(): void;



    }
}