declare module SAT{

    class Vector{
		public x: number;
		public y: number;
        constructor( x?:number, y?:number );
        copy( other:Vector ):Vector;
        clone():Vector;
        perp():Vector;
        rotate( angle:number ):Vector;
        reverse():Vector;
        normalize():Vector;
        add( other:Vector ):Vector;
        sub( other:Vector ):Vector;
        scale( x:number, y?:number ):Vector;
        project( other:Vector ):Vector;
        projectN( other:Vector ):Vector;
        reflect( axis:Vector ):Vector;
        reflectN( axis:Vector ):Vector;
        dot( other:Vector ):Vector;
        len2():Vector;
        len():Vector;
    }

    class Circle{
		public pos: Vector;
		public r: number;
        constructor( pos:Vector, r?:number );
        getAABB():Polygon;
    }

    class Polygon{
		public pos: Vector;
		public points: Vector[];
		public angle: number;
		public offset;
		public calcPoints;
		public edges: Vector[];
		public normals: Vector[];
        constructor( pos:Vector, points:Vector[] );
        setPoints( points:Vector[] ):Polygon;
        setAngle( angle:number ):Polygon;
        setOffset( offset:Vector ):Polygon;
        rotate( angle:number ):Polygon;
        translate( x:number, y:number ):Polygon;
        _recalc():Polygon;
        getAABB():Polygon;
    }

    class Box{
		public pos: Vector;
		public w: number;
		public h: number;
        constructor( pos:Vector, w?:number, h?:number );
        toPolygon():Polygon;
    }

    class Response{
		public a;
		public b;
		public overlap;
		public overlapN;
		public overlapV;
		public aInB: boolean;
		public bInA: boolean;
        constructor();
        clear():Response;
    }

    function flattenPointsOn( points:Vector[], normal:Vector, result:number[] );

    function isSeparatingAxis( aPos:Vector, bPos:Vector, aPoints:Vector[], bPoints:Vector[], axis:Vector[], response:Response ):boolean;

    function voronoiRegion( line:Vector, point:Vector ):number;

    function pointInCircle( p:Vector, c:Circle ):boolean;

    function pointInPolygon( p:Vector, poly:Polygon ):boolean;

    function testCircleCircle( a:Circle, b:Circle, response:Response ):boolean;

    function testPolygonCircle( polygon:Polygon, circle:Circle, response:Response ):boolean;

    function testCirclePolygon( circle:Circle, polygon:Polygon, response:Response ):boolean;

    function testPolygonPolygon( a:Polygon, b:Polygon, response:Response ):boolean;

}
