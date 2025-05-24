import { Vector2D } from './vector2d.js';

export interface Obstacle {
    id: number;
    position: Vector2D;
    width: number;
    height: number;
    color: string;
}