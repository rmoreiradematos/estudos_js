docker login

docker build -t app \
  nodejs-with-postgres-api-example


# cria um apelido para a imagem, com o usuário do dockerhub/repositorio
docker tag app rmoreiradematos/nodejs-with-postgres-api-example

docker push rmoreiradematos/nodejs-with-postgres-api-example

minikube start
minikube dashboard

minikube kubectl get nodes
minikube kubectl describe nodes

kubectl create -f postgres-sts.json
kubectl get statefulset
kubectl get pod postgres-0
kubectl describe sts postgres
kubectl describe pod postgres-0

kubectl create -f postgres-svc.json 
kubectl describe service postgres-svc

kubectl create -f api-deployment.json 
kubectl get deploy
kubectl describe deploy api-heroes
kubectl get pod 
kubectl describe pod api-heroes-c767f5c88-fztql 
kubectl get pod -w
kubectl logs api-heroes-c767f5c88-fztql
kubectl logs -f api-heroes-c767f5c88-fztql

kubectl apply -f api-deployment.json

minikube service api-heroes-svc --url

kubectl delete -f .
minikube delete