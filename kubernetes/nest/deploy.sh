# nest_deploy.sh
echo "Starting Nest JS Kubernetes setup..."

echo "Creating namespace api..."
kubectl create namespace api

echo "Creating ConfigMap..."
kubectl apply -f nest-configmap.yaml

echo "Creating deployment..."
kubectl apply -f nest-deployment.yaml

echo "Creating service..."
kubectl apply -f nest-service.yaml

echo "Nest JS Kubernetes setup completed."

# get the pod name
pod=$(kubectl get pods -n api | grep api | awk '{print $1}')
echo "Pod name: $pod"

ip=$(kubectl describe pod $pod -n api | grep "IP:" | awk '{print $2}')
echo "Pod IP: $ip"





# wait for the pod to be ready
echo "Waiting for the pod to be ready..."
# animate the waiting process (. => .. => ...) with a sleep of 1 second
kubectl wait --for=condition=ready pod -l app=api -n api --timeout=20s > /dev/null &
pid=$! # Process Id of the previous running command

# while the process is still running...
spin='-\|/'

i=0
while kill -0 $pid 2>/dev/null
do
  i=$(( (i+1) %4 ))
  printf "\r${spin:$i:1}"
  sleep .1
done

# if the process has ended...
# with 0 exit code, the pod is ready
# with 1 exit code, the pod is not ready

# get the exit code
wait $pid
exit_code=$?

# if the pod is not ready
if [ $exit_code -eq 1 ]; then
  echo "Pod is not ready. Exiting..."
  exit 1
fi

echo "Pod is ready."
