function Vector(x,y){
  this.x = x;
  this.y = y;
}

function add(v1, v2){
  return new Vector(v1.x + v2.x, v1.y + v2.y);
}
function negate(v){
  return new Vector(- v.x, - v.y);
}
function subtract(v1, v2){
  return add(v1, negate(v2));
}
function abs(v){
  return Math.sqrt(Math.pow(v.x,2) + Math.pow(v.y,2));
}
function dot(v1, v2){
  return v1.x * v2.x + v1.y * v2.y;
}
function cross(v1, v2){
  return v1.x * v2.y - v2.x * v1.y;
}
function toVect(r, t){
  return new Vector(r * Math.cos(t), r * Math.sin(t));
}
function fromVect(v){
  return {r: abs(v), t: Math.atan2(v.y, v.x)};
}

function acosf(x){ /* protect against rounding error on input argument */
  if (Math.abs(x) >1){
      x /=Math.abs(x)
    }
  return Math.acos(x)
}

function calcWind(WS, WD, TAS, HD){
  var GS=Math.sqrt(Math.pow(WS,2) + Math.pow(TAS,2) - 2*WS*TAS*Math.cos(HD-WD))
  var WCA=Math.atan2(WS*Math.sin(HD-WD), TAS-WS*Math.cos(HD-WD))
  var CRS=(HD-WCA) % (2*Math.PI)
  return {gs:GS, crs:CRS};
}

function crsdist(lat1,lon1,lat2,lon2){ // radian args
  /* compute course and distance (spherical) */
  
  if ((lat1+lat2==0.) && (Math.abs(lon1-lon2)==Math.PI)
                      && (Math.abs(lat1) != (Math.PI/180)*90.)){
      alert("Course between antipodal points is undefined")
      }
  
  with (Math){
  
    d=acos(sin(lat1)*sin(lat2)+cos(lat1)*cos(lat2)*cos(lon1-lon2))
  
    if ((d==0.) || (lat1==-(PI/180)*90.)){
       crs12=2*PI
    } else if (lat1==(PI/180)*90.){
       crs12=PI
    } else {
       argacos=(sin(lat2)-sin(lat1)*cos(d))/(sin(d)*cos(lat1))
       if (sin(lon2-lon1) < 0){       
         crs12=acosf(argacos)    
       }
       else{
         crs12=2*PI-acosf(argacos)    
       }
    }
    if ((d==0.) || (lat2==-(PI/180)*90.)){
       crs21=0.
    } else if (lat2==(PI/180)*90.){
       crs21=PI
    }else{
       argacos=(sin(lat1)-sin(lat2)*cos(d))/(sin(d)*cos(lat2))
       if (sin(lon1-lon2)<0){       
         crs21=acosf(argacos)    
       }
       else{
         crs21=2*PI-acosf(argacos)    
       }
    }
  }
  var out=new Object;
  out.d=d;
  out.crs12=crs12;
  out.crs21=crs21;
  return out;
}
